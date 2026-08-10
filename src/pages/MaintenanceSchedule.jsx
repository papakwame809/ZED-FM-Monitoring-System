import MaintenanceTable from "../cards/MaintenanceTable";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";
import { 
    getMaintenanceRecords, 
    createMaintenance, 
    updateMaintenance, 
    deleteMaintenance 
} from "../api/maintenanceApi";
import { getAssets } from "../api/assetsApi";

function MaintenanceSchedule() {
    const { user } = useAuth();
    const isAdmin = hasRole(user, ROLES.ADMIN);

    const formatDateForInput = (dateVal) => {
        if (!dateVal) return "";
        const d = new Date(dateVal);
        return !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "";
    };

    const emptyForm = {
        title: "",
        asset_id: "",
        type: "Routine",
        status: "Pending",
        maintenance_date: formatDateForInput(new Date()), // Mapped to match standard Laravel field
        next_due_date: "",
        notes: "", // Mapped to match notes/description
        cost: "",
    };

    const [maintenance, setMaintenance] = useState([]);
    const [assets, setAssets] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editingMaintenance, setEditingMaintenance] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // LOAD MAINTENANCE & ASSETS FROM API
    useEffect(() => {
        async function loadData() {
            try {
                const [maintenanceData, assetsData] = await Promise.all([
                    getMaintenanceRecords(),
                    getAssets()
                ]);

                setAssets(assetsData || []);

                const formatted = (maintenanceData || []).map((item) => ({
                    id: item.id,
                    title: item.title || item.task || "",
                    asset_id: item.asset_id,
                    asset: item.asset?.name ?? "Unknown",
                    type: item.type || item.task || "Routine",
                    status: item.status || "Pending",
                    maintenance_date: item.maintenance_date || item.service_date ? (item.maintenance_date || item.service_date).split("T")[0] : "",
                    next_due_date: item.next_due_date ? item.next_due_date.split("T")[0] : "",
                    notes: item.notes || item.description || "",
                    cost: item.cost || "",
                }));

                setMaintenance(formatted);
            } catch (err) {
                console.error("Failed loading maintenance data:", err);
            }
        }

        loadData();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSaveMaintenance(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                title: formData.title,
                task: formData.title, 
                asset_id: Number(formData.asset_id),
                type: formData.type,
                status: formData.status,
                maintenance_date: formData.maintenance_date,
                next_due_date: formData.next_due_date || null,
                notes: formData.notes,
                cost: formData.cost ? parseFloat(formData.cost) : null,
            };

            if (editingMaintenance) {
                const updated = await updateMaintenance(editingMaintenance.id, payload);
                setMaintenance((prev) =>
                    prev.map((item) =>
                        item.id === editingMaintenance.id
                            ? {
                                ...item,
                                title: updated.title || payload.title,
                                asset_id: updated.asset_id || payload.asset_id,
                                asset: assets.find(a => a.id === Number(updated.asset_id || payload.asset_id))?.name || item.asset,
                                type: updated.type || payload.type,
                                status: updated.status || payload.status,
                                maintenance_date: (updated.maintenance_date || payload.maintenance_date).split("T")[0],
                                next_due_date: updated.next_due_date ? updated.next_due_date.split("T")[0] : "",
                                notes: updated.notes || updated.description || payload.notes,
                                cost: updated.cost || payload.cost,
                              }
                            : item
                    )
                );
            } else {
                const created = await createMaintenance(payload);
                const newFormatted = {
                    id: created.id,
                    title: created.title || payload.title,
                    asset_id: created.asset_id || payload.asset_id,
                    asset: assets.find(a => a.id === Number(created.asset_id || payload.asset_id))?.name || "Unknown",
                    type: created.type || payload.type,
                    status: created.status || payload.status,
                    maintenance_date: (created.maintenance_date || payload.maintenance_date).split("T")[0],
                    next_due_date: created.next_due_date ? created.next_due_date.split("T")[0] : "",
                    notes: created.notes || created.description || payload.notes,
                    cost: created.cost || payload.cost,
                };
                setMaintenance((prev) => [...prev, newFormatted]);
            }

            resetForm();
        } catch (err) {
            // Extracts exact Laravel validation error messages if available
            console.error("422 Validation Error Details:", err);
            setError(err.message || "Failed to save maintenance record. Check required fields.");
        } finally {
            setLoading(false);
        }
    }

    function handleEditMaintenance(item) {
        setEditingMaintenance(item);
        setFormData({
            title: item.title || "",
            asset_id: item.asset_id || "",
            type: item.type || "Routine",
            status: item.status || "Pending",
            maintenance_date: item.maintenance_date || "",
            next_due_date: item.next_due_date || "",
            notes: item.notes || "",
            cost: item.cost || "",
        });
        setShowForm(true);
    }

    async function handleDeleteMaintenance(id) {
        const confirmed = window.confirm("Delete this maintenance record?");
        if (!confirmed) return;

        try {
            await deleteMaintenance(id);
            setMaintenance((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            alert(err.message || "Failed to delete record.");
        }
    }

    function resetForm() {
        setFormData(emptyForm);
        setEditingMaintenance(null);
        setShowForm(false);
        setError("");
    }

    const filteredMaintenance = maintenance.filter((item) => {
        const matchesSearch = item.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold">Maintenance Schedule</h1>
                <p className="text-gray-600">Track scheduled maintenance across all technical assets.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                {isAdmin && (
                    <button
                        onClick={() => {
                            setEditingMaintenance(null);
                            setFormData(emptyForm);
                            setShowForm(!showForm);
                        }}
                        className="rounded-xl bg-black px-6 py-3 text-white hover:bg-violet-700 transition"
                    >
                        {showForm ? "Cancel" : "+ Schedule Maintenance"}
                    </button>
                )}

                <input
                    type="text"
                    placeholder="Search maintenance..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-xl border px-4 py-3 bg-white"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl border px-4 py-3 bg-white"
                >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* FORM CONTAINER */}
            {showForm && isAdmin && (
                <form onSubmit={handleSaveMaintenance} className="rounded-xl bg-white p-6 shadow border space-y-4">
                    <h2 className="text-xl font-bold">
                        {editingMaintenance ? "Edit Maintenance Record" : "Schedule Maintenance"}
                    </h2>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm whitespace-pre-wrap">
                            {error}
                        </div>
                    )}

                    {/* Maintenance Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Main Transmitter Quarterly Servicing"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Asset Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Asset *</label>
                            <select
                                name="asset_id"
                                value={formData.asset_id}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-3 bg-white"
                            >
                                <option value="">Select Equipment...</option>
                                {assets.map((asset) => (
                                    <option key={asset.id} value={asset.id}>
                                        {asset.name} ({asset.location || "No Location"})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 bg-white"
                            >
                                <option value="Routine">Routine Check</option>
                                <option value="Preventative">Preventative</option>
                                <option value="Corrective">Corrective / Repair</option>
                                <option value="Overhaul">Full Overhaul</option>
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 bg-white"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Cost */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost (GHS)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        {/* Maintenance Date Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Date *</label>
                            <input
                                type="date"
                                name="maintenance_date"
                                value={formData.maintenance_date}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        {/* Next Due Date Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Next Due Date</label>
                            <input
                                type="date"
                                name="next_due_date"
                                value={formData.next_due_date}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Notes</label>
                        <textarea
                            name="notes"
                            rows="3"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Detail work done, parts replaced..."
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (editingMaintenance ? "Update Maintenance" : "Save Maintenance")}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-xl border px-6 py-3 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <MaintenanceTable
                maintenance={filteredMaintenance}
                onEdit={handleEditMaintenance}
                onDelete={handleDeleteMaintenance}
                isAdmin={isAdmin}
            />
        </div>
    );
}

export default MaintenanceSchedule;
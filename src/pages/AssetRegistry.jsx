import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AssetTable from "../cards/AssetTable";
import {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../api/assetsApi";
import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";

const EMPTY_FORM = {
  name: "",
  type: "",
  location: "",
  serial_number: "",
  status: "Operational",
  purchase_date: "",
  last_service: "",
  warranty: "",
};

const STATUS_OPTIONS = ["Operational", "Maintenance Due", "Faulty", "Decommissioned"];

export default function AssetRegistry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isAdmin = hasRole(user, ROLES.ADMIN);

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingAsset, setEditingAsset] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load assets");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!id) return;

    async function loadSingle() {
      try {
        const asset = await getAsset(id);
        setEditingAsset(asset);
        setFormData({
          name: asset.name ?? "",
          type: asset.type ?? "",
          location: asset.location ?? "",
          serial_number: asset.serial_number ?? asset.serialNumber ?? "",
          status: asset.status ?? "Operational",
          purchase_date: asset.purchase_date ?? asset.purchaseDate ?? "",
          last_service: asset.last_service ?? asset.lastService ?? "",
          warranty: asset.warranty ?? "",
        });
        setShowForm(true);
      } catch (err) {
        console.error(err);
        navigate("/assets");
      }
    }
    loadSingle();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData(EMPTY_FORM);
    setEditingAsset(null);
    setShowForm(false);
  }

  async function handleSaveAsset(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let result;
      if (editingAsset) {
        result = await updateAsset(editingAsset.id, formData);
        setAssets((prev) =>
          prev.map((asset) => (asset.id === result.id ? result : asset))
        );
      } else {
        result = await createAsset(formData);
        setAssets((prev) => [...prev, result]);
      }

      resetForm();
      navigate("/assets");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      setError("Failed to save asset. Please verify input fields.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAsset(assetId) {
    if (!window.confirm("Delete this asset?")) return;
    try {
      await deleteAsset(assetId);
      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    } catch (err) {
      console.error(err);
    }
  }

  function handleEditAsset(asset) {
    navigate(`/assets/${asset.id}/edit`);
  }

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "All" || asset.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [assets, searchTerm, filterStatus]);

  if (loading) return <p className="p-6">Loading assets...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {id ? "Edit Asset" : "Asset Registry"}
          </h1>
          <p className="text-gray-600">
            Manage and monitor all technical equipment.
          </p>
        </div>

        {isAdmin && !id && !showForm && (
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-gray-800"
          >
            + Add Asset
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search assets by name..."
          className="rounded-xl border px-5 py-3 w-full max-w-sm"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border px-5 py-3 bg-white"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Asset Form */}
      {showForm && (
        <form
          onSubmit={handleSaveAsset}
          className="rounded-xl bg-white p-6 shadow border space-y-6"
        >
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">
              {editingAsset ? "Update Asset" : "Add Asset"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Asset Name *</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Broadcast Transmitter"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type *</label>
              <input
                required
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g. Audio Gear"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Studio A"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                required
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 bg-white"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Serial Number</label>
              <input
                name="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
                placeholder="e.g. SN-88301"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Purchase Date</label>
              <input
                type="date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Service Date</label>
              <input
                type="date"
                name="last_service"
                value={formData.last_service}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Warranty</label>
              <input
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="e.g. 1 Year Extended"
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-violet-600 px-6 py-3 text-white font-medium hover:bg-violet-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : editingAsset ? "Update Asset" : "Save Asset"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl bg-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Asset Table */}
      <AssetTable
        assets={filteredAssets}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
        isAdmin={isAdmin}
      />
    </div>
  );
}
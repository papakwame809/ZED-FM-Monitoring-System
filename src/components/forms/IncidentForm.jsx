function IncidentForm({
    incident,
    setIncident,
    onSubmit,
    loading,
    
}) {


    function handleChange(e){

        setIncident({

            ...incident,

            [e.target.name]: e.target.value

        });

    }



    return (

        <div className="
            rounded-xl
            border
            border-gray-300
            bg-white
            p-8
        ">


            <h2 className="mb-8 text-xl font-semibold">
                Report Incident
            </h2>



            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-5"
            >




                {/* Incident Title */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Incident Title
                    </label>



                    <input

                        type="text"

                        name="title"

                        value={incident.title}

                        onChange={handleChange}

                        placeholder="Enter incident title..."

                        className="
                        h-10
                        rounded-xl
                        border
                        border-gray-400
                        px-4
                        text-sm
                        outline-none
                        "

                    />


                </div>








                {/* Asset */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Asset
                    </label>



                    <select

                        name="assetId"

                        value={incident.assetId}

                        onChange={handleChange}

                        className="
                        h-10
                        rounded-xl
                        border
                        border-gray-400
                        px-4
                        text-sm
                        outline-none
                        "

                    >


             <option value="">
    Select Asset
</option>

<option value="1">
    FM Transmitter
</option>

<option value="2">
    Studio Console
</option>

<option value="3">
    Mixing Desk
</option>

<option value="4">
    Microphone System
</option>

<option value="5">
    Audio Processor
</option>

<option value="6">
    Power Amplifier
</option>

<option value="7">
    Backup Generator
</option>

                    </select>


                </div>









                {/* Severity */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Severity
                    </label>



                    <select

                        name="severity"

                        value={incident.severity}

                        onChange={handleChange}

                        className="
                        h-10
                        rounded-xl
                        border
                        border-gray-400
                        px-4
                        text-sm
                        outline-none
                        "

                    >


                        <option value="">
                            Select Severity
                        </option>


                        <option value="Critical">
                            Critical
                        </option>


                        <option value="High">
                            High
                        </option>


                        <option value="Medium">
                            Medium
                        </option>


                        <option value="Low">
                            Low
                        </option>


                    </select>


                </div>









                {/* Technician */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Select Technician
                    </label>



                    <select

                        name="technician"

                        value={incident.technician}

                        onChange={handleChange}

                        className="
                        h-10
                        rounded-xl
                        border
                        border-gray-400
                        px-4
                        text-sm
                        outline-none
                        "

                    >


                        <option value="">
                            Assign Technician
                        </option>


                        <option value="Ama">
                            Ama
                        </option>


                        <option value="Kwame">
                            Kwame
                        </option>


                        <option value="Sara">
                            Sara
                        </option>


                    </select>


                </div>









                {/* Description */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Description
                    </label>



                    <textarea

                        name="description"

                        value={incident.description}

                        onChange={handleChange}

                        rows="4"

                        placeholder="Describe the incident..."

                        className="
                        rounded-xl
                        border
                        border-gray-400
                        p-4
                        text-sm
                        outline-none
                        "

                    />


                </div>









                {/* Date */}

                <div className="flex flex-col gap-2">


                    <label className="text-base font-bold">
                        Incident Date
                    </label>



                    <input

                        type="date"

                        name="incidentDate"

                        value={
                            incident.incidentDate
                            ?
                            incident.incidentDate.substring(0,10)
                            :
                            ""
                        }

                        onChange={handleChange}

                        className="
                        h-10
                        rounded-xl
                        border
                        border-gray-400
                        px-4
                        text-sm
                        outline-none
                        "

                    />


                </div>









                {/* Attachment */}

                <div className="flex flex-col gap-3">


                    <label className="text-base font-bold">
                        Attachment
                    </label>



                    <button

                        type="button"

                        className="
                        w-fit
                        rounded-xl
                        bg-black
                        px-5
                        py-2
                        text-sm
                        font-bold
                        text-white
                        "

                    >

                        Upload File 📎

                    </button>


                </div>









                {/* Buttons */}

                <div className="mt-4 flex gap-24">


                    <button

                        type="button"

                        className="
                        rounded-xl
                        bg-black
                        px-8
                        py-2
                        text-base
                        font-bold
                        text-white
                        "

                    >

                        Cancel

                    </button>





                    <button

                        type="submit"

                        disabled={loading}

                        className="
                        rounded-xl
                        bg-violet-600
                        px-8
                        py-2
                        text-base
                        font-bold
                        text-white
                        transition
                        hover:bg-violet-700
                        disabled:opacity-50
                        "

                    >

                        {
                            loading
                            ?
                            "Saving..."
                            :
                            "Submit Incident"
                        }


                    </button>


                </div>



            </form>


        </div>

    );

}


export default IncidentForm;
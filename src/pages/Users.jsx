import users from "../data/users";


function Users() {

  return (

    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="text-gray-600">
          Manage system users and access permissions.
        </p>
      </div>


      <button
        className="
        rounded-xl
        bg-black
        px-6
        py-3
        text-white
        hover:bg-violet-700
        "
      >
        + Add User
      </button>


      <div className="rounded-xl bg-white p-6 shadow">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="p-3">
                Name
              </th>

              <th className="p-3">
                Email
              </th>

              <th className="p-3">
                Role
              </th>

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {users.map((user)=>(
              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-3">
                  {user.name}
                </td>


                <td className="p-3">
                  {user.email}
                </td>


                <td className="p-3 capitalize">
                  {user.role}
                </td>


                <td className="p-3">

                  <button
                    className="
                    rounded-lg
                    bg-gray-200
                    px-4
                    py-2
                    hover:bg-violet-600
                    hover:text-white
                    "
                  >
                    Edit
                  </button>

                </td>


              </tr>
            ))}


          </tbody>


        </table>


      </div>


    </div>

  );
}


export default Users;
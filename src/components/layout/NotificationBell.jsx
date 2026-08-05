import { Bell } from "lucide-react";
import { useState } from "react";


function NotificationBell({
  notifications = []
}) {


  const [open, setOpen] = useState(false);



  return (

    <div className="relative">


      <button

        onClick={() => setOpen(!open)}

        className="
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        transition
        hover:bg-gray-100
        "

      >

        <Bell size={22}/>


        {
          notifications.length > 0 && (

            <span

              className="
              absolute
              right-1
              top-1
              flex
              h-4
              w-4
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[10px]
              text-white
              "

            >

              {notifications.length}

            </span>

          )

        }


      </button>






      {
        open && (

          <div

            className="
            absolute
            right-0
            z-50
            mt-3
            w-80
            rounded-xl
            border
            bg-white
            p-4
            shadow-lg
            "

          >


            <h3 className="mb-4 font-bold">

              Notifications

            </h3>





            {
              notifications.length === 0 ? (

                <p className="text-sm text-gray-500">

                  No new notifications.

                </p>


              ) : (


                notifications.map(notification => (

                  <div

                    key={notification.id}

                    className="
                    border-b
                    py-3
                    "

                  >

                    <p className="font-medium">

                      {notification.title}

                    </p>


                    <p className="text-sm text-gray-500">

                      {notification.message}

                    </p>


                  </div>


                ))

              )

            }
          </div>

        )
      }
    </div>

  );
}

export default NotificationBell;
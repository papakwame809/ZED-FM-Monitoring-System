import incidentsData from "../data/incidents";
import assetsData from "../data/assets";



function generateNotifications() {


  const incidents =

    JSON.parse(
      localStorage.getItem("incidents")
    )
    ||
    incidentsData;





  const assets =

    JSON.parse(
      localStorage.getItem("assets")
    )
    ||
    assetsData;





  const notifications = [];







  // Open / critical incidents

  incidents.forEach((incident)=>{


    if(
      incident.status === "Open" ||
      incident.severity === "Critical"
    ){


      notifications.push({

        id:`incident-${incident.id}`,

        title: incident.title,

        message:
        `${incident.severity} incident requires attention`,

        type:"incident",

      });


    }


  });








  // Faulty assets

  assets.forEach((asset)=>{


    if(asset.status === "Faulty"){


      notifications.push({

        id:`asset-${asset.id}`,

        title: asset.name,

        message:
        "Asset is faulty and requires maintenance",

        type:"asset",

      });


    }



  });








  // Maintenance due assets

  assets.forEach((asset)=>{


    if(asset.status === "Maintenance Due"){


      notifications.push({

        id:`maintenance-${asset.id}`,

        title: asset.name,

        message:
        "Maintenance is due",

        type:"maintenance",

      });


    }


  });






  return notifications;


}



export default generateNotifications;
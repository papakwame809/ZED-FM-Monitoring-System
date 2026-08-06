import { useEffect, useState } from "react";
import { getAssets } from "../api/assetsApi";


function TestAssets(){

    const [assets,setAssets] = useState([]);



    useEffect(()=>{

        getAssets()
        .then(data=>{

            setAssets(data);

        });


    },[]);



    return (

        <div>

            <h1>
                Laravel Assets
            </h1>


            {
                assets.map(asset=>(

                    <p key={asset.id}>

                        {asset.name}

                    </p>

                ))
            }

        </div>

    );

}


export default TestAssets;
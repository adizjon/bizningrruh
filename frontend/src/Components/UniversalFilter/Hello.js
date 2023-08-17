// import React, {useEffect, useState} from 'react';
// import Select from "react-select";
// import UniversalFilter from "./UniversalFilter";
// import axios from "axios";
//
// function Hello(props) {
//     const [category, setCategory] = useState([])
//
//     const multiple = [
//         {
//             name: "city",
//             value: [
//                 {
//                     label: "buxoro",
//                     value: "buxoro"
//                 },
//
//                 {
//                     label: "toshkent",
//                     value: "toshkent"
//                 },
//             ],
//             defaultValue: "city"
//         }
//
//     ]
//     const select = [
//         {
//             name: "active",
//             value: [
//                 {
//                     label: "active",
//                     value: "active"
//                 }, {
//                     label: "no active",
//                     value: "no active"
//                 }
//             ],
//             defaultValue: "active"
//         },
//         {
//             name: "tin",
//             value: [
//                 {
//                     label: "Tin",
//                     value: "Tin"
//                 }, {
//                     label: "With Tin",
//                     value: "With Tin"
//                 }, {
//                     label: "Without Tin",
//                     value: "Without Tin"
//                 }
//             ],
//             defaultValue: "tin"
//         },
//
//         {
//             name: "customer category",
//             value: category?.map(item =>
//                 ( {
//                     label: item.name,
//                     value: item.id
//
//                 })
//             ),
//             defaultValue: "customer category"
//         }
//
//     ]
//
//
//
//     useEffect(() => {
//         axios({
//             url: "http://localhost:8080/customerCategory", method: "get"
//         }).then(res => {
//
//             setCategory(res.data)
//         })
//     }, [])
//     return (
//         <div>
//             <UniversalFilter multiple={multiple} select={select}/>
//
//         </div>
//     );
// }

// export default Hello;
import React, {useEffect, useState} from 'react';
import Select from "react-select";
import UniversalFilter from "./UniversalFilter";
import axios from "axios";

function Hello(props) {
    const [category, setCategory] = useState([])

    const multiple = [
        {
            name: "city",
            value: [
                {
                    label: "buxoro",
                    value: "buxoro"
                },

                {
                    label: "toshkent",
                    value: "toshkent"
                },
            ],
            defaultValue: "city"
        },
        {
            name: "customer category",
            value: category?.map(item =>
                ( {
                    label: item.code,
                    value: item.id

                })
            ),
            defaultValue: "customer category"
        }

    ]
    const select = [
        {
            name: "active",
            value: [
                {
                    label: "active",
                    value: "active"
                }, {
                    label: "no active",
                    value: "no active"
                }
            ],
            defaultValue: "active"
        },

        {
            name: "tin",
            value: [
                {
                    label: "Tin",
                    value: "Tin"
                }, {
                    label: "With Tin",
                    value: "With Tin"
                }, {
                    label: "Without Tin",
                    value: "Without Tin"
                }
            ],
            defaultValue: "tin"
        }

    ]


    useEffect(() => {
        axios({
            url: "http://localhost:8080/api/customerCategory", method: "get"
        }).then(res => {
            setCategory(res.data)
        })
    }, [])

    return (
        <div>
            <UniversalFilter multiple={multiple} select={select}/>

        </div>
    );
}

export default Hello;
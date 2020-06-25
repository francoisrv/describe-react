import run from "../../run";
import React from "react";
import Describe from "../../components/Describe";
import Render from "../../components/Render";
import Expect from "../../components/Expect";
import One from "../../components/One";

// run(() => {
//   function Foo() {
//     return <span />
//   }

//   return (
//     <Describe label="Expect to have type">
//       <Render>
//         <div>
//           <Foo />
//         </div>
//       </Render>

//       <Expect
//         element toHaveType="div"
//         label="Expect root element's type to be a div"
//       />
//       <Expect 
//         child toHaveType={ Foo }
//         label="Expect first child's type to be a Foo"
//       />
//       <Expect
//         element notToHaveType="table"
//         label="Expect root element's type NOT to be a div"
//       />
//     </Describe>
//   )
// })

run(() => (
  <Describe label="Has one of types">
    <Render>
      <div />
    </Render>

    <Expect
      root element toHaveType={ <One of={[ 'div', 'section' ]} /> }
    />
  </Describe>
))
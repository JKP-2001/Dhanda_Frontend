// import React, { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

// export default function ResponsiveDateTimePickers(props) {

//   const [value,setValue] = useState();
//   var today = new Date();|



// // get the date and time
// var now = '';

//   useEffect(()=>{
//     now = today.toISOString();
//     setValue(dayjs(now));
//   },[])

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={[
//           'MobileDateTimePicker',
//         ]}
//       >
//         <DemoItem label="Due Date And Time">
//         {/* <DateTimePicker
//           label="Controlled picker"
//           value={value}
//           onChange={(newValue) => setValue(newValue)}
//         /> */}
//           <MobileDateTimePicker value={dayjs(value)} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }


import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function ResponsiveDateTimePickers() {

  const [value, setValue] = useState();
    var today = new Date();

    

  var now = '';

  useEffect(() => {
    now = today.toISOString();
    setValue(dayjs(now));
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimePicker',
          'MobileDateTimePicker',
          'DesktopDateTimePicker',
          'StaticDateTimePicker',
        ]}
      >
        <DemoItem label="Desktop variant">
          <DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
        </DemoItem>
        <DemoItem label="Mobile variant">
          <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
        </DemoItem>
        <DemoItem label="Responsive variant">
          <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
        </DemoItem>
        <DemoItem label="Static variant">
          <StaticDateTimePicker className='' value={dayjs(value)} disablePast={true}/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

// import React from 'react';

// const StaffTable = ({ staffs, onEdit }) => {
//     if (!staffs || staffs.length === 0) {
//         return <p>No staff members found.</p>;
//     }

//     return (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//             <thead>
//                 <tr style={{ backgroundColor: '#f2f2f2' }}>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Staff ID</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Full Name</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Age</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Gender</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Address</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone Number</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Working</th>
//                     <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {staffs.map((staff) => (
//                     <tr key={staff.id}>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.staffID}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.fullName}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.age}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.gender}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.address}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.phoneNumber}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.role?.name || 'N/A'}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staff.isWorking ? 'Yes' : 'No'}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                             <button onClick={() => onEdit(staff)} style={{ marginRight: '5px' }}>Edit</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };
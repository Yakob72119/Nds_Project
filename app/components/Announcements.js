// const Announcements = () => {
//     const announcements = [
//       {
//         title: "New Service Launch",
//         description: "We're excited to announce our new social media management service starting next month!",
//         date: "6/15/2023",
//         type: "Important",
//         color: "border-red-500",
//       },
//       {
//         title: "Holiday Schedule",
//         description: "Our office will be closed during the upcoming holidays. Please check our contact page for details.",
//         date: "6/10/2023",
//         color: "border-blue-500",
//       },
//       {
//         title: "Partnership Announcement",
//         description: "NDS Trading has partnered with Global Education Initiative to expand our education services.",
//         date: "6/5/2023",
//         type: "Important",
//         color: "border-red-500",
//       }
//     ];
  
//     return (
//       <section className="py-12 px-6">
//         <h2 className="text-2xl font-bold">Announcements</h2>
//         <div className="mt-6 grid md:grid-cols-3 gap-6">
//           {announcements.map((item, index) => (
//             <div key={index} className={`p-6 border-t-4 ${item.color} bg-white shadow-md rounded-lg`}>
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               {item.type && (
//                 <span className="text-sm text-red-600 font-semibold ml-2">{item.type}</span>
//               )}
//               <p className="mt-2 text-gray-600">{item.description}</p>
//               <p className="mt-2 text-sm text-gray-500">{item.date}</p>
//               <a href="#" className="mt-3 inline-block text-blue-600 font-semibold">Read more</a>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };
  
//   export default Announcements;

export default function Announcements() {
  const announcements = [
    {
      title: 'New Service Launch',
      date: '6/15/2023',
      description: 'We are excited to announce our new social media management service starting next month!',
      important: true,
    },
    {
      title: 'Holiday Schedule',
      date: '6/10/2023',
      description: 'Our office will be closed during the upcoming holidays. Please check our contact page for details.',
      important: false,
    },
    {
      title: 'Partnership Announcement',
      date: '6/5/2023',
      description: 'NDS Trading has partnered with Global Education Initiative to expand our education services.',
      important: true,
    },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All →
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {announcements.map((item, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg shadow-md border-l-4 ${
              item.important ? 'border-l-red-500' : 'border-l-blue-500'
            } bg-white`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              {item.important && (
                <span className="text-red-600 text-xs bg-red-50 px-2 py-1 rounded">
                  Important
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">{item.date}</span>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  
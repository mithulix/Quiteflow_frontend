// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../contexts/AuthContext'

// export default function Navbar() {
//   const { user, signOut } = useAuth()
//   const navigate = useNavigate()

//   const handleSignOut = async () => {
//     await signOut()
//     navigate('/login')
//   }

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold text-blue-600">
//               QuoteFlow
//             </Link>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               {user && (
//                 <>
//                   <Link
//                     to={user.user_type === 'customer' ? '/customer/dashboard' : '/provider/dashboard'}
//                     className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     Dashboard
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-500">
//                   {user.email} ({user.user_type})
//                 </span>
//                 <button
//                   onClick={handleSignOut}
//                   className="text-sm text-gray-500 hover:text-gray-700"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-sm text-gray-500 hover:text-gray-700"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="text-sm text-gray-500 hover:text-gray-700"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">QuoteFlow</h1>
          {/* Add your navigation items here */}
        </div>
      </div>
    </nav>
  )
}
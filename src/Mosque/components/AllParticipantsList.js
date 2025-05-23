import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faVenusMars, faEnvelope, 
  faPhone, faMapMarkerAlt, faFilter,
  faUser, faClock, faIdBadge,
  faBriefcase,
  faTrashAlt,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function AllParticipantsList() {
  const [participants, setParticipants] = useState([]);
  const [filterGender, setFilterGender] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const params = {};
        if (filterGender !== 'all') params.gender = filterGender;
        
        const response = await axios.get('https://mosque-two.vercel.app/api/participant/get', { params });
        setParticipants(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching participants:', error);
        setError('Failed to load participants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [filterGender]);


  const handleDeleteMessage = async (participantId) => {
    try {
      await axios.delete(`https://mosque-two.vercel.app/api/participant/${participantId}`);
      setParticipants(participants.filter(participant => participant._id !== participantId));
      alert('Message deleted successfully');
      window.location.reload()
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    }
  };

  return (
    <div className="p-6 bg-white font-Outfit rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#004D01] mb-4 md:mb-0">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Registered Participants
        </h2>
      </div>

      {/* Status Information */}
      {!error && (
        <div className="mb-4 text-sm text-[#004D01]">
          <FontAwesomeIcon icon={faIdBadge} className="mr-2" />
          Showing {participants.length} participants
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 text-[#004D01]">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
          <p>Loading participants...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {/* Participants Table */}
      {!loading && !error && (
  <div className="overflow-x-auto">
  <table className="min-w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Name
        </th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
          <FontAwesomeIcon icon={faVenusMars} className="mr-2" />
          Gender
        </th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Age
        </th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
          Occupation
        </th>
        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {participants.map((participant) => (
        <tr key={participant._id} className="hover:bg-gray-50">
          <td className="py-3 px-4 text-sm">{participant.fullName}</td>
          <td className="py-3 px-4 text-sm">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              participant.gender === 'Male' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-pink-100 text-pink-800'
            }`}>
              {participant.gender}
            </span>
          </td>
          <td className="py-3 px-4 text-sm">{participant.age}</td>
          <td className="py-3 px-4 text-sm">{participant.occupation}</td>
          <td className="py-3 px-4 text-sm">
            <Link 
              to={`/participant/${participant._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={faEye} className="mr-1" />
              View Details
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
}
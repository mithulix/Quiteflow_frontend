import { useParams } from 'react-router-dom';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { useAuth } from '../../contexts/AuthContext';

export default function PlaceBid() {
  const { requestId } = useParams();
  const { placeBid } = useMarketplace();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await placeBid({
      request_id: requestId,
      provider_id: user.id,
      amount: parseFloat(amount),
      message
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Place Bid</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Bid Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, TrendingUp, TrendingDown, Star, Download, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackTable from '../components/FeedbackTable';
import api from '../api/axios';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    averageRating: 0,
    positiveCount: 0,
    negativeCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState('');

  const fetchData = async (ratingFilter = '') => {
    try {
      const params = ratingFilter ? { params: { rating: ratingFilter } } : {};
      const [feedbacksRes, statsRes] = await Promise.all([
        api.get('/feedback', params),
        api.get('/stats')
      ]);
      
      setFeedbacks(feedbacksRes.data.feedbacks || []);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const params = selectedRating ? { params: { rating: selectedRating } } : {};
        const [feedbacksRes, statsRes] = await Promise.all([
          api.get('/feedback', params),
          api.get('/stats')
        ]);
        
        setFeedbacks(feedbacksRes.data.feedbacks || []);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedRating]);

  const handleFeedbackSubmit = () => {
    fetchData(selectedRating);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating === selectedRating ? '' : rating);
  };

  const handleExportCSV = async () => {
    try {
      const params = selectedRating ? { params: { rating: selectedRating } } : {};
      const response = await api.get('/feedback/export', {
        ...params,
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `feedbacks-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to export CSV:', error);
      alert('Failed to export feedbacks. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Manage and view all feedback submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Feedbacks"
            value={stats.totalFeedbacks}
            icon={MessageSquare}
            color="text-blue-600"
          />
          <StatsCard
            title="Average Rating"
            value={stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '0.0'}
            icon={Star}
            color="text-yellow-600"
          />
          <StatsCard
            title="Positive"
            value={stats.positiveCount}
            icon={TrendingUp}
            color="text-green-600"
          />
          <StatsCard
            title="Negative"
            value={stats.negativeCount}
            icon={TrendingDown}
            color="text-red-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FeedbackForm onSuccess={handleFeedbackSubmit} />
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">Search & Filter by Rating</h2>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Filter by Rating:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingFilter(rating.toString())}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${
                          selectedRating === rating.toString()
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${selectedRating === rating.toString() ? 'fill-current' : ''}`} />
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                  {selectedRating && (
                    <button
                      onClick={() => setSelectedRating('')}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear Filter
                    </button>
                  )}
                </div>
                {selectedRating && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Active Filter:</strong> Showing feedbacks with rating {selectedRating} ⭐ 
                      <span className="ml-2">({feedbacks.length} result{feedbacks.length !== 1 ? 's' : ''} found)</span>
                    </p>
                  </div>
                )}
                {!selectedRating && (
                  <p className="mt-3 text-sm text-gray-500">
                    Click on a rating button above to filter feedbacks. Showing all feedbacks ({feedbacks.length} total).
                  </p>
                )}
              </div>
            </div>
          </div>
          <FeedbackTable feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  );
}


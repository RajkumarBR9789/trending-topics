import React, { useState } from 'react';
import { TrendingDisplay } from './components/TrendingDisplay';
import { supabase } from './lib/supabase';
import { generateIP, getRandomTopics } from './lib/mockData';
import { TrendingRecord } from './lib/types';
import { Activity } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendingRecord | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const ip = generateIP();
      const topics = getRandomTopics();
      
      const { data, error } = await supabase
        .from('trending_topics')
        .insert({
          ip_address: ip,
          trend_1: topics[0],
          trend_2: topics[1],
          trend_3: topics[2],
          trend_4: topics[3],
          trend_5: topics[4],
        })
        .select()
        .single();

      if (error) throw error;
      setTrendData(data);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Activity className="mr-2" />
            Trending Topics Tracker
          </h1>
          <p className="text-gray-600 mb-6">
            Created by Rajkumar - Tracking What's Trending
          </p>
          <button
            onClick={fetchTrends}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                     transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Fetching...' : 'Fetch Latest Trends'}
          </button>
        </div>

        <TrendingDisplay data={trendData} loading={loading} />
      </div>
    </div>
  );
}

export default App;
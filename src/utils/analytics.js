// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-82604QSNWB', {
      page_path: path,
      page_title: document.title
    });
  }
};

// Track user details if logged in with Google
export const trackUserVisit = (userDetails) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_visit', {
      user_id: userDetails?.uid,
      email: userDetails?.email,
      name: userDetails?.displayName,
      visit_time: new Date().toISOString()
    });
  }
};

// Get analytics data
export const getAnalyticsData = async () => {
  try {
    // Using GA4's Data API endpoint
    const apiUrl = 'https://analyticsdata.googleapis.com/v1beta/properties/382604955/runReport';
    
    // Get the last 30 days of data
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [
          {
            startDate: startDate.toISOString().split('T')[0],
            endDate: 'today'
          }
        ],
        dimensions: [
          {
            name: 'date'
          }
        ],
        metrics: [
          {
            name: 'activeUsers'
          },
          {
            name: 'sessions'
          },
          {
            name: 'screenPageViews'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      rows: data.rows?.map(row => ({
        dimensions: [row.dimensionValues[0].value],
        metrics: [{
          values: row.metricValues.map(metric => metric.value)
        }]
      })) || [],
      totals: [{
        values: data.totals?.[0]?.metricValues?.map(metric => metric.value) || ['0', '0', '0']
      }]
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    // Return a safe fallback structure
    return {
      rows: [],
      totals: [{
        values: ['0', '0', '0']
      }]
    };
  }
};
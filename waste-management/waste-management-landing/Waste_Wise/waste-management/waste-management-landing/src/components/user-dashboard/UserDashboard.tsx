import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import WasteLoggingForm from '@/components/user-dashboard/WasteLoggingForm';
import WasteTrackingSummary from '@/components/user-dashboard/WasteTrackingSummary';
import WasteAnalytics from '@/components/user-dashboard/WasteAnalytics';
import UserProfile from '@/components/user-dashboard/UserProfile';
import ProgressTracker from '@/components/user-dashboard/ProgressTracker';

// Define the type for WasteEntry
type WasteEntry = {
  id: number;
  type: string;
  amount: number;
  date: Date;
};

const UserDashboard = () => {
  // Initialize wasteEntries with an empty array of WasteEntry type
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);

  // Function to handle new waste entry
  const handleNewWasteEntry = (entry: WasteEntry) => {
    setWasteEntries((prevEntries) => [entry, ...prevEntries]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Logging Section */}
        <Card>
          <CardHeader>
            <CardTitle>Log Waste</CardTitle>
          </CardHeader>
          <CardContent>
            <WasteLoggingForm onSubmit={handleNewWasteEntry} />
          </CardContent>
        </Card>

        {/* User Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <UserProfile />
          </CardContent>
        </Card>

        {/* Waste Tracking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Tracking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <WasteTrackingSummary wasteEntries={wasteEntries} />
          </CardContent>
        </Card>

        {/* Waste Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <WasteAnalytics wasteEntries={wasteEntries} />
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressTracker wasteEntries={wasteEntries} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;

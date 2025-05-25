
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Component/ui/card";
import { Button } from "../Component/ui/button";
import { Users, Calendar, Activity, Heart, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Appointments Today",
      value: "47",
      change: "+8.2%", 
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Active Cases",
      value: "124",
      change: "-2.1%",
      icon: Activity,
      color: "text-orange-600",
    },
    {
      title: "Critical Alerts",
      value: "3",
      change: "+1",
      icon: Heart,
      color: "text-red-600",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      patient: "Sarah Johnson",
      action: "Completed checkup",
      time: "2 hours ago",
      type: "checkup",
    },
    {
      id: 2,
      patient: "Michael Chen",
      action: "Lab results available",
      time: "4 hours ago", 
      type: "lab",
    },
    {
      id: 3,
      patient: "Emma Wilson",
      action: "Prescription updated",
      time: "6 hours ago",
      type: "prescription",
    },
    {
      id: 4,
      patient: "David Miller",
      action: "Follow-up scheduled",
      time: "1 day ago",
      type: "followup",
    },
  ];

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Brown",
      time: "09:00 AM",
      type: "General Checkup",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      patient: "John Davis",
      time: "10:30 AM", 
      type: "Cardiology",
      doctor: "Dr. Johnson",
    },
    {
      id: 3,
      patient: "Lisa Garcia",
      time: "02:00 PM",
      type: "Dermatology",
      doctor: "Dr. Martinez",
    },
    {
      id: 4,
      patient: "Robert Lee",
      time: "03:30 PM",
      type: "Orthopedics", 
      doctor: "Dr. Brown",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{appointment.patient}</p>
                  <p className="text-xs text-gray-600">{appointment.doctor}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                Add Patient
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Activity className="h-6 w-6" />
                View Reports
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

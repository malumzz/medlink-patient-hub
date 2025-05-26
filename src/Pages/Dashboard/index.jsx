
import React from "react";
import { LayoutDashboard, Users, UserRound, MessageSquare, FileText, ArrowUp, ArrowDown, Activity, Calendar } from "lucide-react";

// Inline utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Inline UI Components
const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      change: "+12.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Doctors",
      value: "56",
      change: "+2.1%",
      trend: "up",
      icon: UserRound,
    },
    {
      title: "Appointments Today",
      value: "89",
      change: "-5.2%",
      trend: "down",
      icon: Calendar,
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.8%",
      trend: "up",
      icon: Activity,
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Jane Wilson",
      doctor: "Dr. Johnson",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Bob Brown",
      doctor: "Dr. Davis",
      time: "2:15 PM",
      status: "Completed",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Inline styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .trend-up {
          color: #16a34a;
        }
        
        .trend-down {
          color: #dc2626;
        }
        
        .status-confirmed {
          background-color: #dcfce7;
          color: #166534;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .status-completed {
          background-color: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your healthcare management system</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-sm">
                    {stat.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3 trend-up" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3 trend-down" />
                    )}
                    <span className={stat.trend === "up" ? "trend-up" : "trend-down"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#274D60] text-white">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                  <span
                    className={
                      appointment.status === "Confirmed"
                        ? "status-confirmed"
                        : appointment.status === "Pending"
                        ? "status-pending"
                        : "status-completed"
                    }
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-accent">
                <Users className="h-5 w-5 text-[#274D60]" />
                <div>
                  <p className="font-medium">Add New Patient</p>
                  <p className="text-sm text-muted-foreground">Register a new patient</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-accent">
                <Calendar className="h-5 w-5 text-[#274D60]" />
                <div>
                  <p className="font-medium">Schedule Appointment</p>
                  <p className="text-sm text-muted-foreground">Book a new appointment</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border p-3 text-left hover:bg-accent">
                <MessageSquare className="h-5 w-5 text-[#274D60]" />
                <div>
                  <p className="font-medium">Send Message</p>
                  <p className="text-sm text-muted-foreground">Communicate with staff</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

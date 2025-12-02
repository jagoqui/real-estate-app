import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Home, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Properties',
    value: '24',
    icon: Home,
    change: '+3 this month',
    changeType: 'positive' as const,
  },
  {
    title: 'Owners',
    value: '18',
    icon: Users,
    change: '+2 this month',
    changeType: 'positive' as const,
  },
  {
    title: 'Total Sales',
    value: '$12.5M',
    icon: DollarSign,
    change: '+18% vs last month',
    changeType: 'positive' as const,
  },
  {
    title: 'Conversion Rate',
    value: '24%',
    icon: TrendingUp,
    change: '+5% vs last month',
    changeType: 'positive' as const,
  },
];

// eslint-disable-next-line max-lines-per-function
export const DashboardLayout = (): React.ReactElement => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-semibold">Welcome to the Dashboard</h2>
        <p className="mt-2 text-muted-foreground">General overview of your real estate platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{stat.value}</div>
              <p className="mt-1 text-sm text-emerald-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'New property added',
                  property: 'Modern Villa in Beverly Hills',
                  time: '2 hours ago',
                },
                {
                  action: 'Sale completed',
                  property: 'Penthouse in Manhattan',
                  time: '5 hours ago',
                },
                {
                  action: 'New owner registered',
                  property: 'John Smith',
                  time: '1 day ago',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.property}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Modern Villa', views: 1234, inquiries: 45 },
                { name: 'Manhattan Penthouse', views: 987, inquiries: 32 },
                { name: 'Malibu Beach House', views: 856, inquiries: 28 },
              ].map((property, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{property.name}</p>
                    <p className="text-sm text-muted-foreground">{property.views} views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{property.inquiries}</p>
                    <p className="text-xs text-muted-foreground">inquiries</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

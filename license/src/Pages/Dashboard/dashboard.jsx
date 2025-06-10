import { useUser } from '@clerk/clerk-react';
import { Button, Center, Paper, Tabs  } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import './dashboard.css';
import LicensePage from '/src/Pages/License/license.jsx';
import Settings from '../Settings/settings';
import HomePage from '../Home/home';

function Homepage() {
  const { isSignedIn, user } = useUser();
  const data = fetch('/api/user').then(res => res.json()).catch(err => console.error('Error fetching user data:', err));

  if (!isSignedIn) return <div>
    <Center style={{ height: '100vh', width: '100%' }}>
      <Paper shadow="xs" radius="lg" withBorder p="xl">
        <Button component="a" href="/login" variant="light" fullWidth>Log In</Button>
      </Paper>
    </Center>
  </div>;

  return (
    <div>
      <Tabs defaultValue="Hjem">
        <Tabs.List style={{ height: '60px' }}>
          <Tabs.Tab value="Hjem" leftSection={<IconPhoto size={12} />}>
            Hjem
          </Tabs.Tab>
          <Tabs.Tab value="License" leftSection={<IconMessageCircle size={12} />}>
            License
          </Tabs.Tab>
          <Tabs.Tab value="Indstillinger" leftSection={<IconSettings size={12} />}>
            Indstillinger
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Hjem">
          <Homepage />
        </Tabs.Panel>

        <Tabs.Panel value="License">
          <LicensePage />
        </Tabs.Panel>

        <Tabs.Panel value="Indstillinger">
          <Settings />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default Homepage

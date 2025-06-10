import { UserProfile } from '@clerk/clerk-react';
import { Button, Divider, Space } from '@mantine/core';

function Settings() {
  return (
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginTop: '15vh' }}>
        <UserProfile />
    </div>
  );
}

export default Settings

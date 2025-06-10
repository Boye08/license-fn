import { useUser } from '@clerk/clerk-react';
import { Button, Center, SimpleGrid, Divider, Loader, Box, Paper, Stack, Text, Modal, TextInput, Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const website = 'https://license-api-git-main-boye0.vercel.app';

function LicensePage() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setLoading] = useState(true);

  const [Data, setData] = useState([]);
    
  const [opened, { open, close }] = useDisclosure(false);

  const [Ip, setIp] = useState("");
  const [Type, setType] = useState("");
  const [Date, setDate] = useState("");

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          website + '/api/license/list?authentication=Password123',
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        const json = await res.json();
        setData(json.licenses);
      } catch (error) {
        console.error('Error fetching license data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  async function DeleteLicense(license) {
    const res = await fetch(
      website + '/api/license/delete?authentication=Password123&license=' + license,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    
    notifications.show({
      title: 'License Slettet',
      message: `License ${license} er blevet slettet.`,
    })
  }

  async function CreateLicense() {
    const res = await fetch(
      website + '/api/license/create?authentication=Password123&ip=' + Ip + '&type=' + Type + '&expiry=' + Date,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
  
  const json = await res.json()

  if (json.license === 'undefined') {
    notifications.show({
      color: 'red',
      title: 'License Oprettet',
      message: `Der skette en fejl, under forsøget til at oprette en licensekey til IP: ${Ip}!`,
    });
  } else {
    notifications.show({
      title: 'License Oprettet',
      message: `${Ip} er blevet oprettet.`,
    });
  }
}

const items = Data.map((item, index) => {
    const expiryDate = dayjs(item.expiry);
    const DaysToExpiryDate = expiryDate.diff(dayjs(), 'days');
    const isExpired = DaysToExpiryDate === 0;


    return (
        <Accordion.Item key={index} value={item.license}>
            <Accordion.Control>Licensekey - {item.ip}</Accordion.Control>
            <Accordion.Panel>Type: {item.type}</Accordion.Panel>
            <Accordion.Panel>Udløbsdato: {expiryDate.format('DD MMMM YYYY')} - ({DaysToExpiryDate} dage tilbage) </Accordion.Panel>
            <Accordion.Panel>Licensekey: {item.license}</Accordion.Panel>
            <Accordion.Panel>
                <Divider my="sm" />
                <Button variant="light" fullWidth radius="lg" onClick={() => DeleteLicense(item.license)}>Slet</Button>
            </Accordion.Panel>
        </Accordion.Item>
    );
});

  return (
    <div>
      {isLoading ? (
        <Box pos="relative" py="md">
          <Center>
            <Loader />
          </Center>
        </Box>
      ) : (
        <Stack spacing="md">
          <SimpleGrid cols={1} spacing="sm" style={{ margin: '20px' }}>
            <Button fullWidth variant="light" onClick={() => {open()}}>Lav LicenseKey</Button>
          </SimpleGrid>

          <Divider my="md" />

          <Accordion variant="separated" radius="lg" defaultValue="Apples" style={{ padding: '20px' }}>
            {items}
          </Accordion>
        </Stack>
      )}

      <Modal opened={opened} onClose={close} title="Oprettelse af License" centered>
        <TextInput label="ip" value={Ip} placeholder={'11.11.11.11'} onChange={(e) => setIp(e.target.value)}/>
        <TextInput label="type" value={Type} placeholder={'JM_?'} onChange={(e) => setType(e.target.value)}/>
        <TextInput label="date" value={Date} placeholder={'7/25/2025'} onChange={(e) => setDate(e.target.value)}/>

        <Divider my="sm" />

        <Button fullWidth variant="light" onClick={() => {
          close()
          CreateLicense()
        }}>Opret</Button>
      </Modal>
    </div>
  );
}

export default LicensePage;

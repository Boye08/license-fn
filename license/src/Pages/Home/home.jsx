import { Button, Center, SimpleGrid, Divider, Loader, Box, Paper, Stack, Text, Modal, TextInput, Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const website = 'https://license-api-git-main-boye0.vercel.app';

function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

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
    </div>
  );
}

export default HomePage;

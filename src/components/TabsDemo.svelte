<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/tabs/schema';
  import { Tabs, TabList, Tab, TabPanel } from '$lib/components/tabs';
  import { Card, CardContent } from '$lib/components/card';
  import { Icon } from '$lib/components/icon';

  let playgroundTab = $state('1');
  let basicTab = $state('account');
  let pillsTab = $state('general');
  let segmentedTab = $state('daily');
  let verticalTab = $state('profile');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-md p-6 border border-line-2 bg-layer rounded-2xl">
        <Tabs bind:value={playgroundTab} {...props}>
          <TabList>
            <Tab value="1"><Icon name="user" size={16} /> Profile</Tab>
            <Tab value="2"><Icon name="lock" size={16} /> Security</Tab>
            <Tab value="3"><Icon name="bell" size={16} /> Notifications</Tab>
          </TabList>
          <TabPanel value="1">
            <p class="text-sm text-muted-foreground">Manage your public profile and personal information.</p>
          </TabPanel>
          <TabPanel value="2">
            <p class="text-sm text-muted-foreground">Update your password and secure your account.</p>
          </TabPanel>
          <TabPanel value="3">
            <p class="text-sm text-muted-foreground">Configure your email and push notification preferences.</p>
          </TabPanel>
        </Tabs>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="variants" title="Layout Variants" description="Tabs support three primary visual layouts: underline (default), pills, and segmented.">
    <div class="grid md:grid-cols-2 gap-8">
      <Card>
        <CardContent>
          <h3 class="text-sm font-medium mb-4 text-foreground">Underline (Default)</h3>
          <Tabs bind:value={basicTab} variant="underline" color="primary">
            <TabList>
              <Tab value="account">Account</Tab>
              <Tab value="company">Company</Tab>
              <Tab value="billing">Billing</Tab>
            </TabList>
            <TabPanel value="account"><p class="text-sm text-muted-foreground">Account settings here.</p></TabPanel>
            <TabPanel value="company"><p class="text-sm text-muted-foreground">Company details here.</p></TabPanel>
            <TabPanel value="billing"><p class="text-sm text-muted-foreground">Billing information here.</p></TabPanel>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 class="text-sm font-medium mb-4 text-foreground">Pills</h3>
          <Tabs bind:value={pillsTab} variant="pills" color="primary">
            <TabList>
              <Tab value="general">General</Tab>
              <Tab value="advanced">Advanced</Tab>
              <Tab value="api">API</Tab>
            </TabList>
            <TabPanel value="general"><p class="text-sm text-muted-foreground">General settings here.</p></TabPanel>
            <TabPanel value="advanced"><p class="text-sm text-muted-foreground">Advanced configuration here.</p></TabPanel>
            <TabPanel value="api"><p class="text-sm text-muted-foreground">API keys and tokens here.</p></TabPanel>
          </Tabs>
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardContent>
          <h3 class="text-sm font-medium mb-4 text-foreground">Segmented (Container Style)</h3>
          <div class="max-w-md mx-auto">
            <Tabs bind:value={segmentedTab} variant="segmented" color="primary">
              <TabList>
                <Tab value="daily">Daily</Tab>
                <Tab value="weekly">Weekly</Tab>
                <Tab value="monthly">Monthly</Tab>
              </TabList>
              <TabPanel value="daily"><p class="text-sm text-muted-foreground mt-4 text-center">Daily digest views.</p></TabPanel>
              <TabPanel value="weekly"><p class="text-sm text-muted-foreground mt-4 text-center">Weekly summaries.</p></TabPanel>
              <TabPanel value="monthly"><p class="text-sm text-muted-foreground mt-4 text-center">Monthly analytics.</p></TabPanel>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  </DemoSection>

  <DemoSection id="vertical" title="Vertical Orientation" description="All three variants can be rotated to a vertical layout.">
    <div class="max-w-2xl">
      <Card>
        <CardContent>
          <Tabs bind:value={verticalTab} orientation="vertical" variant="pills" color="primary">
            <TabList class="w-48 shrink-0">
              <Tab value="profile"><Icon name="user" size={18} class="mr-1" /> Profile</Tab>
              <Tab value="settings"><Icon name="gear" size={18} class="mr-1" /> Settings</Tab>
              <Tab value="friends"><Icon name="users" size={18} class="mr-1" /> Friends</Tab>
            </TabList>
            <TabPanel value="profile"><p class="text-sm text-muted-foreground">User profile form.</p></TabPanel>
            <TabPanel value="settings"><p class="text-sm text-muted-foreground">Application settings.</p></TabPanel>
            <TabPanel value="friends"><p class="text-sm text-muted-foreground">Friend list.</p></TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </DemoSection>

</div>
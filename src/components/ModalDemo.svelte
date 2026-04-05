<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/modal/schema';
  import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from '$lib/components/modal';
  import { Button } from '$lib/components/button';

  let isPlaygroundOpen = $state(false);
  let isBasicOpen = $state(false);
  let isGlassOpen = $state(false);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center">
        <Button onclick={() => isPlaygroundOpen = true}>Open Modal</Button>
        <Modal bind:open={isPlaygroundOpen} {...props}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Playground Modal</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              This is the modal content. It inherits the properties configured in the playground below.
            </ModalBody>
            <ModalFooter>
              <Button color="neutral" style="ghost" onclick={() => isPlaygroundOpen = false}>Close</Button>
              <Button color={props.color}>Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="basic" title="Solid Mode" description="A standard, solid modal box with a dark backdrop.">
    <div class="w-full flex justify-center">
      <Button onclick={() => isBasicOpen = true}>Open Basic Modal</Button>
      <Modal bind:open={isBasicOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Newsletter Signup</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>Join our newsletter to receive the latest updates on GlassUI directly in your inbox.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onclick={() => isBasicOpen = false}>Subscribe</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Mode" description="A modal that uses translucent glass rendering.">
    <div class="w-full flex justify-center">
      <Button onclick={() => isGlassOpen = true} color="primary" style="outline">Open Glass Modal</Button>
      <Modal bind:open={isGlassOpen}>
        <ModalContent color="gradient" glass="thick" frosted="heavy">
          <ModalHeader>
            <ModalTitle>Glass Confirmation</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to proceed? This is a highly critical, yet very aesthetically pleasing, decision.</p>
          </ModalBody>
          <ModalFooter>
            <Button glass={false} color="neutral" style="ghost" onclick={() => isGlassOpen = false}>Cancel</Button>
            <Button glass={false} color="destructive" onclick={() => isGlassOpen = false}>Proceed</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  </DemoSection>
</div>
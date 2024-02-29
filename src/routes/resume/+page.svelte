<script>
    import BasicDetails from "$lib/components/BasicDetails.svelte";
    import {clearDetails} from '../../store/resume.js'
    import { onDestroy } from 'svelte';

    onDestroy(() => {
        clearDetails()
    })
</script>

<BasicDetails/>
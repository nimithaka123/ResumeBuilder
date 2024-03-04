<main>
    {#if showTemplate1}
    <SimpleResumeTemplate/>
{:else if showTemplate2}
    <IntermediateResumeTemplate/>
{:else if showTemplate3}
    <ModernResumeTemplate/>
{:else if showSocialMedia}
    <SocialMediaProfile/>
{:else}
    <div class="flex items-center justify-center h-screen flex-col">
        <div>
            <button type="button" class="border-2 border-gray-400 hover:bg-gray-400 rounded-lg p-3 w-40 mt-10" on:click={backToForm}>
                <span>Go back</span>
            </button>
        </div>
        <h1 class="text-4xl text-cyan-600 font-extrabold">Choose your template</h1>
        <div class="grid grid-cols-3 gap-8 mt-10">
            <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat" on:click={simpleTemplateClick}>
                <img
                src={template1}
                class="max-w-xs"
                alt="template 1"/>
                <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-slate-600 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-40"></div>
            </div>
            <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat" on:click={IntermediateTemplateClick}>
                <img
                src={template2}
                class="max-w-xs"
                alt="template 2"/>
                <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-slate-600 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-40"></div>
            </div>
            <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat" on:click={modernTemplateClick}>
                <img
                src={template3}
                class="max-w-xs"
                alt="template 3"/>
                <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-slate-600 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-40"></div>
            </div> 
        </div>
    </div>
{/if}
</main>



<script>
    import ModernResumeTemplate from './ModernResumeTemplate.svelte';
    import SimpleResumeTemplate from './simpleResumeTemplate.svelte';
    import IntermediateResumeTemplate from './IntermediateResumeTemplate.svelte';
    import SocialMediaProfile from './SocialMediaProfile.svelte';

    import template1 from '../../assets/template1.png'
    import template2 from '../../assets/template2.png'
    import template3 from '../../assets/template3.png'
    import { div } from 'edgedb/dist/primitives/bigint';

    let showTemplate1 = false
    let showTemplate2 = false
    let showTemplate3 = false
    let showSocialMedia = false

    function simpleTemplateClick() {
        showTemplate1 = true
    }

    function IntermediateTemplateClick() {
        showTemplate2 = true
    }

    function modernTemplateClick() {
        showTemplate3 = true
    }

    function backToForm() {
        showSocialMedia = true
    }

</script>

export async function copy(text: string){
    if(navigator?.clipboard){
        await navigator.clipboard.writeText(text);
    }else{
        throw new Error("Clipboard API not available");
    }
}
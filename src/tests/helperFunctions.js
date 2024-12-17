/**
 * Simulates a scroll event on the window with the given scrollY value.
 * Useful for testing scrolling behavior of components.
 * @param {number} scrollY - The value to set window.scrollY to. Defaults to 10.
 */
export function triggerScrollEventY(scrollY = 10){
    try{
        window.scrollY = scrollY;
        window.dispatchEvent(new Event('scroll'));
        
    }catch (error){
        console.error(error.message)
    }
}
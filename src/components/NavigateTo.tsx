export const NavigateTo = (url: string, newTab?: boolean) => {
    !newTab ? chrome.tabs.update({ url: url } ) : chrome.tabs.create({ url: url } )
}

export default NavigateTo;
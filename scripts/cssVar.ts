export function getElementCSSVariables (allCSSVars: string[], element: HTMLElement, pseudo: any){
    var elStyles = window.getComputedStyle(element, pseudo);
    var cssVars = {};
    for(var i = 0; i < allCSSVars.length; i++){
        let key = allCSSVars[i];
        let value = elStyles.getPropertyValue(key)
        //@ts-ignore
        if(value){cssVars[key] = value;}
    }
    return cssVars;
}

export function getAllCSSVariableNames(styleSheets: StyleSheetList){
    var cssVars = [];
    // loop each stylesheet
    for(var i = 0; i < styleSheets.length; i++){
        // loop stylesheet's cssRules
        try{ // try/catch used because 'hasOwnProperty' doesn't work
            for( var j = 0; j < styleSheets[i].cssRules.length; j++){
                try{
                    // loop stylesheet's cssRules' style (property names)
                    //@ts-ignore
                    for(var k = 0; k < styleSheets[i].cssRules[j].style.length; k++){
                        //@ts-ignore
                        let name = styleSheets[i].cssRules[j].style[k];
                        // test name for css variable signiture and uniqueness
                        if(name.startsWith('--') && cssVars.indexOf(name) == -1){
                            cssVars.push(name);
                        }
                    }
                } catch (error) {}
            }
        } catch (error) {}
    }
    return cssVars;
}

export function changeCssVar(variable: string, value: string, root: Element | null) {
    if (root) {
        //@ts-ignore
        root.style.setProperty(variable, value);
    }
}
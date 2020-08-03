const { React, i18n: { Messages } } = require('powercord/webpack');
const { Divider } = require('powercord/components');

const InstalledProduct = require('../../pc-moduleManager/components/parts/InstalledProduct');

module.exports = class ThemeTogglerSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='powercord-entities-manage powercord-text'>
                <div className='powercord-entities-manage-header'>
                    <span>{Messages[`POWERCORD_THEMES_INSTALLED`]}</span>
                </div>
                <Divider/>
                {this.renderBody()}
            </div>
        );
    }

    renderBody () {
        const items = [];
        powercord.styleManager.themes.forEach(theme => items.push(this.renderItem(theme)));

        return(
            <div className='powercord-entities-manage-items'>
                {items}
            </div>
        );
    }

    renderItem(item) {
        return(
            <InstalledProduct
                product={item.manifest}
                isEnabled={item.applied}
                onToggle={v => {
                    if(v) powercord.styleManager.enable(item.entityID);
                    else powercord.styleManager.disable(item.entityID);
                }}
            />
        );
    }
}
const { React, i18n: {Messages} } = require('powercord/webpack');
const { Card, Tooltip, Switch } = require('powercord/components');

const ThemeDetails = require('./ThemeDetails.jsx');
const Divider = require('powercord/components/Divider.jsx');

module.exports = class ThemeCard extends React.PureComponent {
    constructor(props) {
        super(props);

        this.item = props.item;
    }

    render() {
        return(
            <Card className='powercord-product'>
                {this.renderHeader()}
                {this.renderDetails()}
            </Card>
        );
    }

    renderHeader() {
        return(
            <div className='powercord-product-header'>
                <h4>{this.item.manifest.name}</h4>
                <Tooltip text={this.item.applied ? Messages.DISABLE : Messages.ENABLE} position='top'>
                    <div>
                        <Switch value={this.item.applied} onChange={v => this.props.onToggle(v.target.checked)} />
                    </div>
                </Tooltip>
            </div>
        );
    }

    renderDetails() {
        return(
            <>
                <Divider />
                <ThemeDetails
                    svgSize={24}
                    author={this.item.manifest.author}
                    version={this.item.manifest.version}
                    description={this.item.manifest.description}
                    license={this.item.manifest.license}
                />
            </>
        )
    }
}
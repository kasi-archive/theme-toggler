const { React, i18n: {Messages} } = require('powercord/webpack');
const { Tooltip, Icons: { Receipt, Person, Tag, Chemistry, Scale, Info } } = require('powercord/components');

module.exports = React.memo(({ author, version, description, license, svgSize }) => (
    <div className='powercord-product-details'>
        <div className='description'>
            <Tooltip text={Messages.DESCRIPTION} position='top'>
                <Receipt width={svgSize} height={svgSize} />
            </Tooltip>
            <span>{description}</span>
        </div>
        <div className='metadata'>
            <div className='author'>
                <Tooltip text={Messages.APPLICATION_STORE_DETAILS_DEVELOPER} position='top'>
                    <Person width={svgSize} height={svgSize} />
                </Tooltip>
                <span>{author}</span>
            </div>
            <div className='version'>
                <Tooltip text={Messages.POWERCORD_PLUGINS_VERSION} position='top'>
                    <Tag width={svgSize} height={svgSize} />
                </Tooltip>
                <span>v{version}</span>
            </div>
            <div className='licenese'>
                <Tooltip text={Messages.POWERCORD_PLUGINS_LICENSE} position='top'>
                    <Scale width={svgSize} height={svgSize} />
                </Tooltip>
                <span>{license}</span>
            </div>
        </div>
    </div>
));
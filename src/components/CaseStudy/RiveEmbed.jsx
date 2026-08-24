import PropTypes from 'prop-types';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-webgl2';

const FIT = {
    contain: Fit.Contain,
    cover: Fit.Cover,
    fill: Fit.Fill,
    fitWidth: Fit.FitWidth,
    fitHeight: Fit.FitHeight,
    scaleDown: Fit.ScaleDown,
    none: Fit.None,
};

/**
 * Live .riv embed on the WebGL2 runtime (required for vector feathering).
 * Used to showcase the Heartful Gardens motion pieces inside case studies.
 */
export const RiveEmbed = ({
    src,
    stateMachines,
    artboard,
    autoplay = true,
    fit = 'contain',
    className,
}) => {
    const { RiveComponent } = useRive({
        src,
        stateMachines,
        artboard,
        autoplay,
        autoBind: true,
        layout: new Layout({ fit: FIT[fit] ?? Fit.Contain, alignment: Alignment.Center }),
    });

    return <RiveComponent className={className} />;
};

RiveEmbed.propTypes = {
    src: PropTypes.string.isRequired,
    stateMachines: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    artboard: PropTypes.string,
    autoplay: PropTypes.bool,
    fit: PropTypes.oneOf(['contain', 'cover', 'fill', 'fitWidth', 'fitHeight', 'scaleDown', 'none']),
    className: PropTypes.string,
};

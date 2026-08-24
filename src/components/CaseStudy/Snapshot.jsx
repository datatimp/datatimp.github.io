import PropTypes from 'prop-types';
import styles from './CaseStudy.module.css';

const Item = ({ label, value }) =>
    value ? (
        <div className={styles.snapItem}>
            <dt className={styles.snapLabel}>{label}</dt>
            <dd className={styles.snapValue}>{value}</dd>
        </div>
    ) : null;
Item.propTypes = { label: PropTypes.string, value: PropTypes.node };

/**
 * At-a-glance bar under the hero: role, timeline, client, tools, platform.
 */
export const Snapshot = ({ role, timeline, client, tools, platform, liveUrl }) => {
    const toolsText = Array.isArray(tools) ? tools.join(', ') : tools;
    return (
        <dl className={styles.snapshot}>
            <Item label="Role" value={role} />
            <Item label="Client" value={client} />
            <Item label="Tools" value={toolsText} />
            <Item label="Platform" value={platform} />
            {liveUrl && (
                <div className={styles.snapItem}>
                    <dt className={styles.snapLabel}>Live</dt>
                    <dd className={styles.snapValue}>
                        <a href={liveUrl} target="_blank" rel="noreferrer">Visit ↗</a>
                    </dd>
                </div>
            )}
        </dl>
    );
};

Snapshot.propTypes = {
    role: PropTypes.string,
    timeline: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    client: PropTypes.string,
    tools: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    platform: PropTypes.string,
    liveUrl: PropTypes.string,
};

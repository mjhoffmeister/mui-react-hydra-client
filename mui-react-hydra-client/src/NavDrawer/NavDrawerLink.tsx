import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import React from "react";

/**
 * Props interface for the {NavDrawerLink} component.
 */
interface NavDrawerLinkProps {
    iconHint?: string,
    text: string,
    url: string
};

/**
 * Link for navigating to different pages listed in the {NavDrawer} component.
 * @param {NavDrawerLinkProps} props - Props for the component.
 */
export default function NavDrawerLink(props: NavDrawerLinkProps) {
    // Deconstruct props
    const { iconHint, text, url } = props;

    // Memoize the link for improved performance
    const link = React.useMemo(
        () => 
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
                (itemProps, ref) => (
                    <RouterLink to={url} {...itemProps} innerRef={ref} />
                ),
            ),
        [url],
    )

    /**
     * Get the Material UI icon font name from the iconHint prop.
     * @returns {string} - The MUI icon font name.
     */
    const getIconNameFromHint = (): string => {
        switch (iconHint) {
            case 'dateRange': return 'date_range';
            case 'people': return 'people';
            case 'queueMusic': return 'queue_music';
            // The InsertDriveFile icon looks like a page, so use it for links without a valid icon hint
            default: return 'insert_drive_file';
        }
    }

    // Render
    return (
        <li>
            <ListItem button component={link}>
                <span className="material-icons">{getIconNameFromHint()}</span>
                <ListItemText primary={text} />
            </ListItem>
        </li>
    );
}
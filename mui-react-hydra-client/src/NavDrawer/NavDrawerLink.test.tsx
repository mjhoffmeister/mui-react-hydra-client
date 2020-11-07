import each from 'jest-each';
import NavDrawerLink from './NavDrawerLink';
import React from 'react';
import { render } from '@testing-library/react';

describe('NavDrawerLink', () => {
    describe('renders expected icon', () => {
        each([
            ['dateRange', 'date_range'],
            ['people', 'people'],
            ['queueMusic', 'queue_music']
        ]).it("when iconHint is '%s'", (iconHint: string, iconName: string) => {
            const { getByText } = render(<NavDrawerLink iconHint={iconHint} text="Test" url="test" />);

            expect(getByText(iconName)).toBeInTheDocument();
        });
    });

    describe('displays expected text', () => {
        each([
            ['Home'],
            ['Users'],
        ]).it("when text is '%s'", (text: string) => {
            const { getByText } = render(<NavDrawerLink text={text} url="/test" />);

            expect(getByText(text)).toBeInTheDocument();
        });
    });

    describe('contains expected link', () => {
        each([
            ['https://www.example.com/home'],
            ['https://www.example.com/users']
        ]).it("when url is '%s'", (url: string) => {
            const { getByText } = render(<NavDrawerLink text="Test" url={url} />);

            expect(document.querySelector('a')?.getAttribute('href'))
                .toBe(url);
        });
    })
});
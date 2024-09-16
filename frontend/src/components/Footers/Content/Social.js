import Column from '../Columns/Column'
import ParagraphTitle from '../Paragraphs/ParagraphTitle'
import ParagraphContent from '../Paragraphs/ParagraphContent'
import LinkSocial from '../Links/LinkSocial'
import {Facebook, Instagram, PeopleFill } from 'react-bootstrap-icons'


export default function Social(props) {
    return (
        <Column width='4'>
            <ParagraphTitle title="Social Media" />
            <ParagraphContent>
                <LinkSocial link="https://www.facebook.com">
                    <Facebook size={30} />
                </LinkSocial>
                <LinkSocial link="https://www.instagram.com">
                    <Instagram size={30} />
                </LinkSocial>
                <LinkSocial link="https://www.dostartu.pl">
                    <PeopleFill size={30}/>      
                </LinkSocial>
            </ParagraphContent>
        </Column>
    )
}
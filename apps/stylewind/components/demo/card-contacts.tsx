import { Popover } from '@/components/primitives/Popover';
import { Item } from '@/components/primitives/Item';
import { Avatar } from '@/components/primitives/Avatar';
import { Button } from '@/components/primitives/Button';

import Picture from './../../app/home/window.svg';

export function CardContacts({ className = "" }: { className?: string }) {
    return (
        <Popover className={className}>
            <Item.List>
                <Avatar src={Picture} />
                <div className="flex-auto">
                    <div className="font-medium">Leonard Krasner</div>
                    <div className="mt-1 text-subtle">@leonardkrasner</div>
                </div>
                <Button.Surface>View</Button.Surface>
            </Item.List>
            <Item.List>
                <Avatar src={Picture} />
                <div className="flex-auto">
                    <div className="font-medium">Floyd Miles</div>
                    <div className="mt-1 text-subtle">@floydmiles</div>
                </div>
                <Button.Surface>View</Button.Surface>
            </Item.List>
            <Item.List>
                <Avatar src={Picture} />
                <div className="flex-auto">
                    <div className="font-medium">Emily Selman</div>
                    <div className="mt-1 text-subtle">@emilyselman</div>
                </div>
                <Button.Surface>View</Button.Surface>
            </Item.List>
            <div className="p-4">
                <Button.Tonal>View all</Button.Tonal>
            </div>
        </Popover>
    );
}
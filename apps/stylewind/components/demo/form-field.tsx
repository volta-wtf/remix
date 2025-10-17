import { Field } from '../primitives/Field';
import { Label } from '../primitives/Label';
import { Select } from '../primitives/Select';
import { DropdownSelect } from './dropdown-select';

export function FormField() {
    return (
        <Field className="w-[28.125rem]">
            <Label text="Assigned to" />
            <Select className="mt-2" />
            <DropdownSelect className="mt-4" />
        </Field>
    );
}
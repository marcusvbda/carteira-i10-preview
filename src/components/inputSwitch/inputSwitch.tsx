'use client';
import './_styles.scss';
import { useState } from 'react';

export default function InputSwitch() {
    const [checked, setChecked] = useState(false);

    return (
        <label
            className={`switch ${checked ? 'checked' : ''}`}
            onClick={() => setChecked(!checked)}
        >
            <div className={`switch--toggle ${checked ? 'checked' : ''}`} />
        </label>
    );
}

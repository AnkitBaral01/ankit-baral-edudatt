import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class BaseEntity {
    /**
     * The unique identifier of the document.
     */
    _id: mongoose.Types.ObjectId;

    /**
     * The date and time when the document was created.
     */
    createdAt: Date;

    /**
     * The date and time when the document was last updated.
     */
    updatedAt?: Date;

    @Prop({
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false,
    })
    is_disabled: boolean;
}

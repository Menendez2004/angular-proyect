import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import { AuthServiceMockComponent } from '../../../mocks/auth.mock';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

export default {
    title: 'auth/AuthService',
    component: AuthServiceMockComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                HttpClientModule,
            ],
            providers: [
                AuthService,
            ],
        }),
    ],
} as Meta;

const Template: StoryFn = (args) => ({
    component: AuthServiceMockComponent,
    props: args,
});

export const Default = Template.bind({});
Default.args = {};

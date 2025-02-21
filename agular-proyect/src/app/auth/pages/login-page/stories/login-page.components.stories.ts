import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../../services/auth.service";
import { MockAuthService } from "../../../../mocks/user.mock";
import { action } from "@storybook/addon-actions";

@Component({
    selector: "auth-login-page-mock",
    templateUrl: './login-page.component.story.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
})
class MockLoginComponent {
    @Input() email: string = "";
    @Input() password: string = "";

    private validEmail = "testuser@example.com";
    private validPassword = "123456";

    onLogin() {
        if (this.email === this.validEmail && this.password === this.validPassword) {
            action("Login Success")({ email: this.email, password: this.password });
        } else {
            action("Login Failed, verify your crendentials")({ email: this.email, password: this.password });
            
        }
    }
}

export default {
    title: "Auth/Login-page",
    component: MockLoginComponent,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatIconModule,
            ],
            providers: [{ provide: AuthService, useClass: MockAuthService }],
        }),
    ],
    argTypes: {
        email: {
            control: "text",
            description: "User email input",
            defaultValue: "testuser@example.com",
        },
        password: {
            control: "text",
            description: "User password input",
            defaultValue: "123456",
        },
    },
} as Meta<MockLoginComponent>;

type Story = StoryObj<MockLoginComponent>;

export const ValidCredentials: Story = {
    args: {
        email: "testuser@example.com",
        password: "123456",
    },
};

export const InvalidCredentials: Story = {
    args: {
        email: "wronguser@example.com",
        password: "wrongpassword",
    },
};

import { IStackProps, IStackStyles, PrimaryButton, Spinner, SpinnerSize, Stack, StackItem, TextField } from "@fluentui/react";
import React, { FormEventHandler } from "react";
import { Text } from "@fluentui/react";
import { DefaultEffects } from "@fluentui/react";
import LoginService from "./LoginService";
import { Alert, Snackbar } from "@mui/material";


const stackStyles: Partial<IStackStyles> = {
    root: {
        padding: '30px 30px',
        boxShadow: DefaultEffects.elevation8,
        backgroundColor: 'white'
    },
};

const columnProps: Partial<IStackProps> = {
    styles: { root: { width: 400 } },
};

type LoginState = {
    username: string;
    password: string;
    error: boolean;
    isLoading: boolean;
    openSuccess: boolean;
    openError: boolean;
}

const loginService = new LoginService();

export class LoginComponent extends React.Component<{}, LoginState> {

    state: LoginState = {
        username: '',
        password: '',
        isLoading: false,
        error: false,
        openSuccess: false,
        openError: false,
    }

    constructor(props: {}) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.checkTextFields = this.checkTextFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessClose = this.handleSuccessClose.bind(this);
        this.handleErrorClose = this.handleErrorClose.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        const name: string = event.currentTarget.name;
        if (newValue == undefined) {
            return null;
        }
        if (name === 'username') {
            this.setState({ username: newValue });
        } else {
            this.setState({ password: newValue });
        }
    }

    doLogin(event: React.FormEvent<HTMLFormElement>): void {
        event?.preventDefault();
        if (this.state.username === "" || this.state.password === "") {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            this.setState({ isLoading: true });

            loginService
                .login(this.state.username, this.state.password)
                .then((result) => {
                    this.setState({ isLoading: false });
                    this.setState({ openSuccess: true });
                }
                ).catch((error) => {
                    this.setState({ isLoading: false });
                    this.setState({ openError: true });

                })
        }
    }

    checkTextFields(text: string) {
        if (!this.state.error) {
            return "";
        }
        if (text == null || text.length === 0) {
            return "Enter the username";
        }
    }

    handleSuccessClose(event?: React.SyntheticEvent | Event, reason?: string) {
        this.setState({ openSuccess: false });
    };

    handleErrorClose(event?: React.SyntheticEvent | Event, reason?: string) {
        this.setState({ openError: false });
    };

    render() {
        return (
            <div style={{margin: '0 auto'}}>
                <Stack styles={stackStyles} tokens={{ childrenGap: 30 }}>
                <Stack>
                    <Text variant="xxLargePlus">
                        Login
                    </Text>
                </Stack>
                <form onSubmit={this.doLogin}>
                    <Stack tokens={{ childrenGap: 20 }}>
                        <StackItem {...columnProps}>
                            <TextField label="Username"
                                name="username"
                                onChange={this.handleChange}
                                errorMessage={(this.state.error && this.state.username.length == 0) ? "Enter your username" : ""}>
                            </TextField>
                        </StackItem>
                        <StackItem {...columnProps}>
                            <TextField
                                label="Password "
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                errorMessage={(this.state.error && this.state.password.length == 0) ? "Enter your password" : ""}>
                            </TextField>
                        </StackItem>
                    </Stack>
                    <Stack horizontalAlign="end" styles={{ root: { paddingTop: "30px" } }} horizontal tokens={{ childrenGap: 15 }}>
                        {this.state.isLoading && <Spinner size={SpinnerSize.large} />}
                        <StackItem>
                            <PrimaryButton text="Login" type="submit" allowDisabledFocus styles={{ root: { width: "12rem" } }} />
                        </StackItem>
                    </Stack>
                </form>
                <Snackbar open={this.state.openSuccess} onClose={this.handleSuccessClose}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Login successfull!
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.openError} onClose={this.handleErrorClose}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Username or password incorrect
                    </Alert>
                </Snackbar>
            </Stack>
            </div>
        )
    }
}
import { Controller } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}
}

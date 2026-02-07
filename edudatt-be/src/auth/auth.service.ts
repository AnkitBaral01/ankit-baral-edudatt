import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

	constructor(private usersService: UserService) { }

	async login(createAuthDto: CreateAuthDto) {

		try {

			const user = await this.usersService.findOneByEmail(createAuthDto.email);

			if(!user) {
				throw new BadRequestException('User not found');
			}

			if (user.email_verified_at === null) {
				// throw new BadRequestException('Email not verified');
			}

			const passwordMatch = await bcrypt.compare(createAuthDto.password, user.password);
			
			if(!passwordMatch) {
				throw new BadRequestException('Invalid password');
			}

			const tokens = await this.getJwtToken(user);

			return {
				user: {
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					mobile_number: user.mobile_number,
				},
				tokens
			};

		} catch (e) {
			if(e instanceof BadRequestException) {
				throw e;
			}
			throw new Error('An error occurred');
		}

	}

	async getJwtToken(user: any) {
		
		try {

			const payload = {
				sub: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				mobile_number: user.mobile_number
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_VALIDITY });

			const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_VALIDITY });

			return {token, refreshToken};

		} catch (e) {
			throw e;
		}

	}

	async refreshToken(user: User) {
		
		const tokens = await this.getJwtToken(user);

		return tokens;

	}
	
}

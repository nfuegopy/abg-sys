// src/modules/superadmin/test/superadmin.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminController } from '../../src/modules/superadmin/controller/superadmin.controller';
import { SuperAdminService } from '../../src/modules/superadmin/service/superadmin.service';

describe('SuperAdminController', () => {
  let controller: SuperAdminController;
  let service: SuperAdminService;

  const mockSuperAdminService = {
    create: jest.fn(dto => {
      return {
        id: Date.now().toString(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
    findOne: jest.fn(id => {
      return { id, name: 'Test User', email: 'test@example.com', password: 'hashedpassword', is_active: true, created_at: new Date(), updated_at: new Date() };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto, updated_at: new Date() };
    }),
    remove: jest.fn(id => {
      return { id };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminController],
      providers: [
        {
          provide: SuperAdminService,
          useValue: mockSuperAdminService,
        },
      ],
    }).compile();

    controller = module.get<SuperAdminController>(SuperAdminController);
    service = module.get<SuperAdminService>(SuperAdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a super admin', () => {
    const dto = { name: 'Test', email: 'test@example.com', password: 'password' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all super admins', () => {
    expect(controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one super admin', () => {
    const id = '1';
    expect(controller.findOne(id)).toEqual({
      id,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a super admin', () => {
    const id = '1';
    const dto = { name: 'Updated Test', email: 'updated@example.com', password: 'updatedpassword' };
    expect(controller.update(id, dto)).toEqual({
      id,
      ...dto,
      updated_at: expect.any(Date),
    });
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a super admin', () => {
    const id = '1';
    expect(controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});

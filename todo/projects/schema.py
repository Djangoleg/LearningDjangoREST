import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from projects.models import User, Project, ToDo


# level 1.
# class Query(ObjectType):
#     hello = graphene.String(default_value="Hi!")
#
#
# schema = graphene.Schema(query=Query)

# level 2.
# class UserType(DjangoObjectType):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class Query(ObjectType):
#     all_users = graphene.List(UserType)
#
#     def resolve_all_users(root, info):
#         return User.objects.all()
#
#
# schema = graphene.Schema(query=Query)


# level 3.
# class UserType(DjangoObjectType):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class ProjectType(DjangoObjectType):
#     class Meta:
#         model = Project
#         fields = '__all__'
#
#
# class TodoType(DjangoObjectType):
#     class Meta:
#         model = ToDo
#         fields = '__all__'
#
#
# class Query(ObjectType):
#     all_users = graphene.List(UserType)
#     all_project = graphene.List(ProjectType)
#     all_todo = graphene.List(TodoType)
#
#     def resolve_all_users(root, info):
#         return User.objects.all()
#
#     def resolve_all_project(root, info):
#         return Project.objects.all()
#
#     def resolve_all_todo(root, info):
#             return ToDo.objects.all()
#
#
# schema = graphene.Schema(query=Query)

# Level 4.
# class UserType(DjangoObjectType):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class ProjectType(DjangoObjectType):
#     class Meta:
#         model = Project
#         fields = '__all__'
#
#
# class TodoType(DjangoObjectType):
#     class Meta:
#         model = ToDo
#         fields = '__all__'
#
#
# class Query(ObjectType):
#     user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))
#
#     def resolve_user_by_id(root,info, id=None):
#         user = User.objects.all()
#         if id:
#             return user.get(id=id)
#         return None
#
#     project_by_user = graphene.List(ProjectType, username=graphene.String(required=False))
#
#     def resolve_project_by_user(root,info,username=None):
#         project = Project.objects.all()
#         if username:
#             return project.filter(user__username=username)
#         return project
#
#
# schema = graphene.Schema(query=Query)

# Level 5.
class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(ObjectType):
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))
    project_by_user = graphene.List(ProjectType, username=graphene.String(required=False))
    all_users = graphene.List(UserType)
    all_project = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)

    def resolve_user_by_id(root, info, id=None):
        user = User.objects.all()
        if id:
            return user.get(id=id)
        return None

    def resolve_project_by_user(root, info, username=None):
        project = Project.objects.all()
        if username:
            return project.filter(user__username=username)
        return project

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        last_name = graphene.String(required=True)
        first_name = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, last_name, first_name, id):
        user = User.objects.get(id=id)
        user.last_name = last_name
        user.first_name = first_name
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, first_name, last_name, email):
        user = User.objects.create(username=username, first_name=first_name, last_name=last_name, email=email)
        return UserCreateMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    user = graphene.List(UserType)

    @classmethod
    def mutate(cls, root, info, id):
        User.objects.get(id=id).delete()
        user = User.objects.all()
        return UserDeleteMutation(user=user)


class Mutation(ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

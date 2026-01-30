<template>
    <div class="m-10">
        <div class="mb-4">
            <h1 class="flex-none text-2xl font-bold">Audit Log</h1>
        </div>
        

        <div v-if="auditLogs.length > 0">
            <div class="overflow-x-auto rounded-box border bg-base-100 border-slate-300 shadow-sm">
                <table class="table table-pin-cols">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Action</th>
                            <th>Entity</th>
                            <th>Entity ID</th>
                            <th>Description</th>
                            <th>Logged At</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr v-for="auditLog in auditLogs" :key="auditLog.id" class="hover:bg-base-300">                    
                            <td>{{ auditLog.userId }}</td>
                            <td>
                                <div v-if="auditLog.action == 'CREATE'" class="badge bg-green-100 text-green-700">{{ auditLog.action }}</div>
                                <div v-if="auditLog.action == 'UPDATE'" class="badge bg-blue-100 text-blue-700">{{ auditLog.action }}</div>
                                <div v-if="auditLog.action == 'DELETE'" class="badge bg-red-100 text-red-700">{{ auditLog.action }}</div>
                                <div v-if="auditLog.action == 'LOGIN'" class="badge bg-purple-100 text-purple-700">{{ auditLog.action }}</div>
                            </td>
                            <td>{{ auditLog.entity }}</td>
                            <td>{{ auditLog.entityId }}</td>
                            <td>{{ auditLog.description }}</td>
                            <td>{{ formatDate(auditLog.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else class="hero bg-base-200 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                <h1 class="text-5xl font-bold">Hello there!</h1>
                <p class="py-6">
                    No audit logs found. Start performing actions to generate audit logs!
                </p>
                <a href="/product/create" class="btn btn-primary">Get Started</a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import AuditLogService from "../../services/AuditLogService";

export default {
    data() {
        return {
            auditLogs: []
        };
    },
    methods: {
        formatDate(dateTime) {
            return new Date(dateTime).toLocaleString('en-MY', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    },
    mounted() {
        AuditLogService.getAuditLog()
            .then(response => {
                this.auditLogs = response.data;
            })
            .catch(e => {
                console.error(e);
            });
    }
};
</script>